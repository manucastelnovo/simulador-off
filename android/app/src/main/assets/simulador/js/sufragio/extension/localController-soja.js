class DataServiceSoja extends DataService {
    constructor() {
        super();
    }
}

class BusinessDataSoja extends BusinessData {
    constructor(dataService) {
        super();
        this.dataService = dataService;
    }
}

class SeleccionSoja extends Seleccion {
    constructor() {
        super();
    }
}

class LocalControllerSoja extends LocalController {
    constructor(businessData, seleccion) {
        super();
        this.businessData = businessData;
        this.seleccion = seleccion;
    }
}

const dataServiceSoja = new DataServiceSoja();
const businessDataSoja = new BusinessDataSoja(dataServiceSoja);
const seleccionSoja = new SeleccionSoja();
localController = new LocalControllerSoja(businessDataSoja, seleccionSoja);
