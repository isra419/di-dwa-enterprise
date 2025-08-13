(function(){
  const modal = document.getElementById('addProductModal');
  const btnOpen = document.getElementById('btnAddProduct');
  const btnClose = document.getElementById('btnCloseModal');
  const btnCancel = document.getElementById('btnCancelModal');

  function openModal(){ modal.setAttribute('aria-hidden', 'false'); }
  function closeModal(){ modal.setAttribute('aria-hidden', 'true'); }

  btnOpen && btnOpen.addEventListener('click', openModal);
  btnClose && btnClose.addEventListener('click', closeModal);
  btnCancel && btnCancel.addEventListener('click', closeModal);
  modal && modal.addEventListener('click', (e)=>{
    if(e.target === modal) closeModal();
  });
})();