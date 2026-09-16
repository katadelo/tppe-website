(function(){
  var fill = document.getElementById('meterFill');
  var num = document.getElementById('meterNum');
  var target = 92;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function styleHeaderNav(){
    var links = document.querySelectorAll('nav.primary a');
    links.forEach(function(link){
      link.style.display = 'inline-flex';
      link.style.alignItems = 'center';
      link.style.justifyContent = 'center';
      link.style.background = '#2A2A2A';
      link.style.border = '1px solid rgba(255,255,255,0.16)';
      link.style.color = '#F2F2F2';
      link.style.padding = '10px 16px';
      link.style.fontWeight = '600';
      link.style.textDecoration = 'none';
    });
  }

  function run(){
    if(!fill || !num) return;
    if(reduced){
      fill.style.height = target + '%';
      num.innerHTML = target + '<span>%</span>';
      return;
    }
    fill.style.height = target + '%';
    var start = null;
    var duration = 2400;
    function step(ts){
      if(!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.round(eased * target);
      num.innerHTML = current + '<span>%</span>';
      if(progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function setupContactForm(){
    var form = document.querySelector('.contact-form');
    if(!form) return;

    form.addEventListener('submit', function(event){
      event.preventDefault();

      var name = document.getElementById('name').value.trim();
      var email = document.getElementById('email').value.trim();
      var job = document.getElementById('job').value.trim();
      var message = document.getElementById('message').value.trim();

      var subject = 'TPPE Website Load Bank Inquiry - ' + (name || 'Customer');
      var body = [
        'Name: ' + name,
        'Email: ' + email,
        'Generator size / test date: ' + job,
        '',
        'Message:',
        message
      ].join('\n');

      window.location.href = 'mailto:sales@txpowerproenterprise.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      return false;
    });
  }

  styleHeaderNav();
  setupContactForm();

  if(document.readyState === 'complete'){
    setTimeout(run, 250);
  } else {
    window.addEventListener('load', function(){ setTimeout(run, 250); });
  }
})();