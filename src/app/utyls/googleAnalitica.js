window._gaq = window._gaq || [];

export default {
  insertGA() {
    window._gaq.push(['_setAccount', 'UA-136619449-1']);
    let ga = document.createElement('script');
    ga.type = 'text/javascript';
    ga.async = true;
    ga.src = 'https://ssl.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ga, s);
  },

  fireEvent(category, action, label) {
    window._gaq.push([
      '_trackEvent',
      category,
      action,
      label,
    ]);
  }
};

