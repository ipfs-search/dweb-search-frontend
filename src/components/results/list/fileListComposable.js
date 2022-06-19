import { useRouter, useRoute } from 'vue-router';
import { computed } from 'vue';
import store from '@/store';
import { batchSize, maxPages } from '@/helpers/ApiHelper';
import { enterSearchQuery } from '@/helpers/routerHelper';
import ListBase from '@/components/results/list/ListBase.vue';
import prettyBytes from 'pretty-bytes';
import durationToColor from '@/filters/durationToColor';
import mime from 'mime';
import { Types } from '@/helpers/typeHelper';

export const fileListProps = {
  fileType: {
    type: String,
    required: true,
  },
  shortList: {
    type: Number,
    required: false,
    default: 3,
  },
  infinite: {
    type: Boolean,
    required: false,
    default: false,
  },
}

export const fileListComposable = ({ fileType, shortList, infinite }) => {
  const route = useRoute();
  const router = useRouter();

  // Computed properties
  const shownHits= computed(() => {
    const results = store.getters[`results/${fileType}/pageResults`](Number(route.query.page) || 1)
    if (route.query.type === fileType) {
      return results
    }
    return results.slice(0, shortList);
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

  // Methods:
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
  /**
   * specific for paginated file lists
   * @param query
   */
  function handleQueryChange(query = route.query) {
    if (infinite) {
      // TODO!! fix this
      if (query.type === fileType) {
        document.addEventListener('scroll', this.infiniteScroll, true);
      } else {
        document.removeEventListener('scroll', this.infiniteScroll, true);
      }
      this.getInfiniteResults();
    } else {
      store.dispatch(`results/${fileType}/fetchPage`, { page: query.page || 1 });
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
    goToDetailPage,
    handleQueryChange,
    setFileType,
  }
}

export const imports = {
  mime, durationToColor, ListBase, prettyBytes,
}
