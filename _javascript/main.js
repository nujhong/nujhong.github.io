function openModal () {
  document.getElementById('portfolio').classList.add('is-active');
}

function closeModal () {
  document.getElementById('portfolio').classList.remove('is-active');
}

document.addEventListener('DOMContentLoaded', () => {
  var rellax = new Rellax('.rellax', {
    center: true
  });
});

window.onload = function (){
  setTimeout(function () {
    document.getElementById('pageloader').classList.remove('is-active');
  }, 800);
  // el.addEventListener('click', function(e){
  //   e = window.event || e;
  //   if(this === e.target) {
  //     closeModal()
  //   }
  // });
};
