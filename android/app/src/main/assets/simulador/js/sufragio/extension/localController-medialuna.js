class DataServiceMedialuna extends DataService {
    constructor() {
        super();
    }
}

class BusinessDataMedialuna extends BusinessData {
    constructor(dataService) {
        super();
        this.dataService = dataService;
    }
}

class SeleccionMedialuna extends Seleccion {
    constructor() {
        super();
    }
}

class LocalControllerMedialuna extends LocalController {
    constructor(businessData, seleccion) {
        super();
        this.businessData = businessData;
        this.seleccion = seleccion;
    }
}

const dataServiceMedialuna = new DataServiceMedialuna();
const businessDataMedialuna = new BusinessDataMedialuna(dataServiceMedialuna);
const seleccionMedialuna = new SeleccionMedialuna();
localController = new LocalControllerMedialuna(
    businessDataMedialuna,
    seleccionMedialuna
);
