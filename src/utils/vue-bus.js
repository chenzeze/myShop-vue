const VueBus = {
  $httpRequestList: [],
  clearHttpRequestingList: () => {
    if (VueBus.$httpRequestList.length > 0) {
      VueBus.$httpRequestList.forEach((item) => {
        item();
      })
      VueBus.$httpRequestList = []
    }
  }
}

export default VueBus;
