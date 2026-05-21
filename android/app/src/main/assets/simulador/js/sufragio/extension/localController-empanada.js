class DataServiceEmpanada extends DataService {}

class BusinessDataEmpanada extends BusinessData {
    constructor(dataService) {
        super();
        this.dataService = dataService;
    }
}

class SeleccionEmpanada extends Seleccion {
    constructor() {
        super();
    }
}

class LocalControllerEmpanada extends LocalController {
    constructor(businessData, seleccion) {
        super();
        this.businessData = businessData;
        this.seleccion = seleccion;
    }
}

const dataServiceEmpanada = new DataServiceEmpanada();
const businessDataEmpanada = new BusinessDataEmpanada(dataServiceEmpanada);
const seleccionEmpanada = new SeleccionEmpanada();
localController = new LocalControllerEmpanada(
    businessDataEmpanada,
    seleccionEmpanada
);
