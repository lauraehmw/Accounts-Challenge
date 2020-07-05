class Payment {
  constructor(date, concept, amount) {
    this.id = Payment.incrementId();
    this.date = date;
    this.concept = concept;
    this.amount = amount;
  }

  static incrementId() {
    if (!this.autoId) {
      this.autoId = 1;
    } else this.autoId++;

    return this.autoId;
  }
}

class Interface {
  addPayment(payment) {
    const paymentContainter = document.getElementById("payments");
    const paymentRow = document.createElement("div");
    paymentRow.className = "row";
    paymentRow.innerHTML = `
        <div class="col-1 border">
          <strong>${payment.id}</strong>
        </div>
        <div class="col-2 border">
            <strong>${payment.date}</strong>
        </div>
        <div class="col-3 border">
            <strong>${payment.concept}</strong>
        </div>
        <div class="col-3 border">
            <strong>$${payment.amount}</strong>
        </div>
        <div class="col-3 border">
            <a href="#" class="btn btn-info">
                Edit
            </a>
            <a href="#" class="btn btn-danger">
                Delete
            </a>
        </div>        
    `;

    paymentContainter.appendChild(paymentRow);

    return true;
  }

  deletePayment() {}

  editPayment() {}

  showMessage() {}

  showMessageForm(text, status){
      document.getElementById("modal-message").innerHTML =
        `
            <span class="text-${status}">${text}!</span>
        `
  }

  resetForm(){
      document.getElementById("payment-form").reset();
  }
}

document.getElementById("payment-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const date = document.getElementById("date").value;
  const concept = document.getElementById("concept").value;
  const amount = document.getElementById("amount").value;
  
  const payment = new Payment(date, concept, amount);

  const ui = new Interface();
  if(ui.addPayment(payment) == true){
      ui.resetForm();
      ui.showMessageForm('Payment recorded!', 'success')
  }

});
