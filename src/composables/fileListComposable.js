import { useRouter, useRoute } from 'vue-router';
import { computed } from 'vue';
import store from '@/store';
import { batchSize, maxPages } from '@/helpers/ApiHelper';
import { enterSearchQuery } from '@/router';

import prettyBytes from 'pretty-bytes';
import durationToColor from '@/helpers/durationToColor';
import mime from 'mime';
import { Types } from '@/helpers/typeHelper';
import getResourceURL from '@/helpers/resourceURL';

const infiniteScrollMargin = 200;

export const fileListProps = {
  shortList: {
    type: Number,
    required: false,
    default: 3,
  },
}

export const fileListComposable = ({ fileType, shortList }) => {
  const route = useRoute();
  const router = useRouter();

  // Computed properties
  const shownHits= computed(() => {
    const results = infinite.value
      ? store.getters[`results/${fileType}/hits`]
      : store.getters[`results/${fileType}/pageResults`](Number(route.query.page) || 1)
    if (route.query.type === Types.any) {
      return results.slice(0, shortList);
    }
    return results
  })

  const resultsTotal = computed(() => {
    const resultsTotalMax = 10000;
    const total = store.getters[`results/${fileType}/resultsTotal`];
    if (total === resultsTotalMax) {
      return '10000+';
    }
    return total;
  })

  const loading = computed(() => store.getters[`results/${fileType}/loading`])

  const error = computed(() => {
    const error = store.getters[`results/${fileType}/error`];
    if (error) console.error('Error loading results', error);
    return error;
  })

  const pageCount = computed(() => Math.min(
    Math.ceil(store.getters[`results/${fileType}/resultsTotal`] / batchSize)),
    maxPages,
  )

  const queryPage = computed({
    get() { return Number(route.query.page); },
    set(value) { enterSearchQuery(route.query, value); },
  })

  const anyFileType = computed(() => {
    return route.query.type === Types.any || route.query.type === undefined;
  })

  const infinite = computed(() => route.query.type === Types.images)

  const loadedPages = computed(
    () => Math.ceil(store.getters[`results/${fileType}/hits`].length / batchSize)
  )

  // Methods:
  const getInfiniteResults = () => Promise.all(Array.from(
    { length: Math.min(store.state.query.page + 1, maxPages) },
    (_, i) => store.dispatch(`results/${fileType}/fetchPage`, { page: i + 1 }),
  ));

  /**
   * See if the the page scrolled so far down that empty space opens up at the bottom.
   * Also update the url
   */
  const infiniteScroll = () => {
    if (!infinite.value) return;
    const { scrollTop, scrollHeight } = document.documentElement;
    // calculate, which page is currently in view
    const scrollPage = Math.floor(loadedPages.value * (scrollTop / scrollHeight)) + 1;
    // if needed, change the page in the URL
    if (store.state.query.page !== scrollPage) {
      enterSearchQuery(route.query, scrollPage, 'replace');
    }
    const nearBottom = window.innerHeight + infiniteScrollMargin > scrollHeight - scrollTop;
    if (nearBottom && !store.getters[`results/${fileType}/loading`]) {
      return store.dispatch(
        `results/${fileType}/fetchPage`,
        { page: loadedPages.value + 1 },
      );
    }
  }

  /**
   * scroll down to the page from the query
   */
  const scrollDown = () => {
    const scrollQueryPage = Number(route.query.page);
    const { scrollHeight } = document.documentElement;
    let top = 0;
    if (scrollQueryPage > 1) {
      top = ((scrollHeight - window.innerHeight) / loadedPages.value) * (scrollQueryPage + 1);
    }
    window.scrollTo({
      top,
      left: 0,
      behavior: 'smooth',
    });
  }

  function goToDetailPage(index) {
    router.push({
      name: 'Detail',
      params: {
        fileType: fileType,
        fileHash: shownHits.value[index].hash,
        selectedIndex: index,
      },
      query: route.query,
    });
  }

  function handleQueryChange(query = route.query) {
    if (infinite.value) {
      // if (query.type === fileType) {
      //   document.addEventListener('scroll', infiniteScroll, true);
      // } else {
      //   document.removeEventListener('scroll', infiniteScroll, true);
      // }
      return getInfiniteResults();
    } else {
      return store.dispatch(`results/${fileType}/fetchPage`, { page: query.page || 1 });
    }
  }

  function getResultsOnMount() {
    if(infinite.value) {
      handleQueryChange()
        .then(scrollDown)
        .then(infiniteScroll);
    }
    else {
      handleQueryChange()
    }
  }

  function setFileType() {
    enterSearchQuery({ type: fileType });
  }

  return {
    shownHits,
    resultsTotal,
    loading,
    error,
    pageCount,
    anyFileType,
    queryPage,
    infinite,
    getInfiniteResults,
    infiniteScroll,
    scrollDown,
    goToDetailPage,
    handleQueryChange,
    setFileType,
    getResultsOnMount,
  }
}

export const imports = {
  mime, durationToColor, prettyBytes, getResourceURL,
}
