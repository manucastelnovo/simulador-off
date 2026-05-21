class DataServiceVanilla extends DataService {
    constructor() {
        super();
    }
}

class BusinessDataVanilla extends BusinessData {
    constructor(dataService) {
        super();
        this.dataService = dataService;
    }
}

class SeleccionVanilla extends Seleccion {
    constructor() {
        super();
    }
}

class LocalControllerVanilla extends LocalController {
    constructor(businessData, seleccion) {
        super();
        this.businessData = businessData;
        this.seleccion = seleccion;
    }
}

const dataServiceVanilla = new DataServiceVanilla();
const businessDataVanilla = new BusinessDataVanilla(dataServiceVanilla);
const seleccionVanilla = new SeleccionVanilla();
localController = new LocalControllerVanilla(
    businessDataVanilla,
    seleccionVanilla
);
