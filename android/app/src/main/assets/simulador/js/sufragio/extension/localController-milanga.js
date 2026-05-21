class DataServiceMilanga extends DataService {
    constructor() {
        super();
    }
}

class BusinessDataMilanga extends BusinessData {
    constructor(dataService) {
        super();
        this.dataService = dataService;
    }
}

class SeleccionMilanga extends Seleccion {
    constructor() {
        super();
    }
}

class LocalControllerMilanga extends LocalController {
    constructor(businessData, seleccion) {
        super();
        this.businessData = businessData;
        this.seleccion = seleccion;
    }
}

const dataServiceMilanga = new DataServiceMilanga();
const businessDataMilanga = new BusinessDataMilanga(dataServiceMilanga);
const seleccionMilanga = new SeleccionMilanga();
localController = new LocalControllerMilanga(
    businessDataMilanga,
    seleccionMilanga
);
