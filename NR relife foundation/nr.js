function toggleFAQ(event) {
    const faqItem = event.currentTarget.parentNode;
    const isOpen = faqItem.classList.contains('open');
  
    document.querySelectorAll('.faq-item').forEach(item => {
      item.classList.remove('open');
    });
  
    if (!isOpen) {
      faqItem.classList.add('open');
    }
  }
  