// SPDX-FileCopyrightText: 2022 2022 Mathijs de Bruin, <mathijs@mathijsfietst.nl> et al.
//
// SPDX-License-Identifier: AGPL-3.0-only

import store from '@/store';
import { batchSize, maxPages } from '@/helpers/ApiHelper';
import { enterSearchQuery } from '@/helpers/routerHelper';

const infiniteScrollMargin = 200;

export default {
  data() {
    return {
      infinite: true,
    };
  },

  computed: {
    /**
     * overrides FileListMixin
     */
    results() {
      return store.getters[`results/${this.fileType}/hits`];
    },
    loadedPages() {
      return Math.ceil(this.results.length / batchSize);
    },
  },

  created() {
    this.getInfiniteResults()
      .then(this.scrollDown)
      .then(this.infiniteScroll);
  },

  methods: {
    /**
     * get all pages of results up to the query parameter page
     * @param pager
     */
    getInfiniteResults() {
      return Promise.all(Array.from(
        { length: Math.min(store.state.query.page + 1, maxPages) },
        (_, i) => store.dispatch(`results/${this.fileType}/fetchPage`, { page: i + 1 }),
      ));
    },

    /**
     * See if the the page scrolled so far down that empty space opens up at the bottom.
     * Also update the url
     */
    infiniteScroll() {
      const { scrollTop, scrollHeight } = document.documentElement;

      // calculate, which page is currently in view
      const scrollPage = Math.floor(this.loadedPages * (scrollTop / scrollHeight)) + 1;

      // if needed, change the page in the URL
      if (store.state.query.page !== scrollPage) {
        enterSearchQuery(this.$route.query, scrollPage, 'replace');
      }

      const nearBottom = window.innerHeight + infiniteScrollMargin > scrollHeight - scrollTop;
      if (nearBottom && !this.loading) {
        return store.dispatch(`results/${this.fileType}/fetchPage`,
          { page: this.loadedPages + 1 });
      }
      return null;
    },

    /**
     * scroll down to the page from the query
     */
    scrollDown() {
      const scrollQueryPage = Number(this.$route.query.page);
      const { scrollHeight } = document.documentElement;

      let top = 0;
      if (scrollQueryPage > 1) {
        top = ((scrollHeight - window.innerHeight) / this.loadedPages) * (scrollQueryPage + 1);
      }

      window.scrollTo({
        top,
        left: 0,
        behavior: 'smooth',
      });
    },

    /**
     * overrides FileListMixin
     */
    handleQueryChange(query) {
      if (query.type === this.fileType) {
        document.addEventListener('scroll', this.infiniteScroll, true);
      } else {
        document.removeEventListener('scroll', this.infiniteScroll, true);
      }
      this.getInfiniteResults();
    },
  },
  beforeDestroy() {
    document.removeEventListener('scroll', this.infiniteScroll, true);
  },
};
