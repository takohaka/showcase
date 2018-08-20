import Vue from 'vue';

Vue.directive('scroll', {
  inserted(el, binding) {
    const f = function (event: UIEvent) {
      if (binding.value(event, el)) {
        window.removeEventListener('scroll', f)
      }
    };
    window.addEventListener('scroll', f);
  }
});

Vue.directive('parallax', {
  inserted(el, binding) {
    const f = function (event: UIEvent) {
      console.log('a');
      if (el.getBoundingClientRect().top + document.body.scrollTop <= window.innerHeight - binding.value.start) {
        if (binding.value.handler(event, el)) {
          window.removeEventListener('scroll', f)
        }
      }
    };
    window.addEventListener('scroll', f);
  }
});
