class App {
  constructor() {
    this.clearButton = document.getElementById("clear-btn");
    this.loadButton = document.getElementById("load-btn");
    this.carContainerElement = document.getElementById("cars-container");

    this.inputDate = document.getElementById("inputDate");
    this.inputTime = document.getElementById("inputTime");
    this.inputCapacity = document.getElementById("inputCapacity");
    this.searchBtn = document.getElementById("searchBtn");
  }

  async init() {
    await this.load();

    this.clearButton.onclick = this.clear;
    this.loadButton.onclick = this.run;
    this.searchBtn.onclick = this.search;
  }


  search = async () => {
    this.clear();

    const dateValue = this.inputDate.value;
    const timeValue = this.inputTime.value;
    const capacityValue = this.inputCapacity.value;

    if(!dateValue || !timeValue || !capacityValue){
      alert("Mohon Isi semua inputan");
      return;
    }

    const datetime = new Date(`${dateValue} ${timeValue}`);

    const filterer = (car) => {
      const dateFilter = car.availableAt > datetime;
      const capacityFilter = car.capacity > capacityValue;

      return dateFilter && capacityFilter;
    }

    const cars = await Binar.listCars(filterer);

    Car.init(cars);

    if (cars.length === 0) {
      const node = document.createElement("div");
      node.innerHTML = "<strong>Mohon maaf, Tidak ada mobil</strong>";
      this.carContainerElement.appendChild(node);
    } else {
      Car.list.forEach((car) => {
        const node = document.createElement("div");
        node.innerHTML = car.render();
        this.carContainerElement.appendChild(node);
      });
    }
  }

  run = () => {
    Car.list.forEach((car) => {
      const node = document.createElement("div");
      node.innerHTML = car.render();
      this.carContainerElement.appendChild(node);
    });
  };

  async load() {
    const cars = await Binar.listCars();

    Car.init(cars);
  }

  clear = () => {
    let child = this.carContainerElement.firstElementChild;

    while (child) {
      child.remove();
      child = this.carContainerElement.firstElementChild;
    }
  };
}
