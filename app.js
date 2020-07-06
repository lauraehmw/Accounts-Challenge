const paymentsArray =[];

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
    paymentRow.id = "pay-"+payment.id;
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
            <a href="#" class="btn btn-info" name="edit">
                Edit
            </a>
            <a href="#" class="btn btn-danger" name="delete">
                Delete
            </a>
        </div>        
    `;

    paymentContainter.appendChild(paymentRow);

    return true;
  }

  deletePayment(element) {
      element.parentElement.parentElement.remove();
  }

  editPayment(payment) {
    document.getElementById("edit-payment-id").value = payment.id;
    document.getElementById("edit-concept").value = payment.concept;
    document.getElementById("edit-date").value = payment.date;
    document.getElementById("edit-amount").value = payment.amount;
    $("#editpaymentModal").modal();
  }

  editElement(payment){
    const paymentRow = document.getElementById("pay-"+ payment.id);
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
            <a href="#" class="btn btn-info" name="edit">
                Edit
            </a>
            <a href="#" class="btn btn-danger" name="delete">
                Delete
            </a>
        </div>        
    `;
  }

  showMessageForm(text, status){
        document.getElementById("modal-message").innerHTML =
            `
                <span class="text-${status}">${text}</span>
            `;
        setTimeout(()=>{
            document.getElementById("modal-message").innerHTML = "";
        },3000)
  }

  resetForm(idForm){
    document.getElementById(`${idForm}`).reset();
  }
}

document.getElementById("payment-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const date = document.getElementById("date").value;
  const concept = document.getElementById("concept").value;
  const amount = document.getElementById("amount").value;
  
  const payment = new Payment(date, concept, amount);
  paymentsArray.push(payment);

  const ui = new Interface();
  if(ui.addPayment(payment) == true){
      ui.resetForm("payment-form");
      ui.showMessageForm('Payment recorded', 'success')
  }
});


document.getElementById('payments').addEventListener('click', (e)=>{
    const ui = new Interface();
    const clicked = e.target;   
    paymentNumber = (clicked.parentElement.parentElement.id.slice(4))-1;
    
    if(clicked.name ==="delete"){
        ui.deletePayment(clicked);
        paymentsArray[paymentNumber].name = ""
        paymentsArray[paymentNumber].concept = ""
        paymentsArray[paymentNumber].amount = "" 
    }else if(clicked.name === "edit"){
        ui.editPayment(paymentsArray[paymentNumber]);
    }   
})


document.getElementById("edit-payment-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const payment = paymentsArray[document.getElementById("edit-payment-id").value-1];

    payment.concept = document.getElementById("edit-concept").value;
    payment.date = document.getElementById("edit-date").value;
    payment.amount = document.getElementById("edit-amount").value;

    const ui = new Interface();
    ui.editElement(payment);
    ui.resetForm("edit-payment-form");
    $("#editpaymentModal").modal('hide');
});