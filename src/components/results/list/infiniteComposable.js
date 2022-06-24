// TODO: delete this file, it has been replaced by fileListComposable.js
import { computed } from 'vue';
import store from '@/store';
import { batchSize, maxPages } from '@/helpers/ApiHelper';
import { enterSearchQuery } from '@/helpers/routerHelper';
import { useRoute } from 'vue-router';

const infiniteScrollMargin = 200;
const route = useRoute()

export const useInfinite = ({ fileType }) => {

  const loadedPages = computed(() => Math.ceil(store.getters[`results/${fileType}/hits`] / batchSize))

  const getInfiniteResults = () => Promise.all(Array.from(
    { length: Math.min(store.state.query.page + 1, maxPages) },
    (_, i) => store.dispatch(`results/${fileType}/fetchPage`, { page: i + 1 }),
  ));

  /**
   * See if the the page scrolled so far down that empty space opens up at the bottom.
   * Also update the url
   */
  const infiniteScroll = () => {
    const { scrollTop, scrollHeight } = document.documentElement;

    // calculate, which page is currently in view
    const scrollPage = Math.floor(this.loadedPages * (scrollTop / scrollHeight)) + 1;

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

  return {
    getInfiniteResults,
    infiniteScroll,
    scrollDown,
  }
}
