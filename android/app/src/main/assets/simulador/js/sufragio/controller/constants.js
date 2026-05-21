class Constants {
    constructor(constants) {
        this.constants = constants;
    }
    get_constant(nameConstants) {
        let match;
        let valor = this.constants;
        // Expresión regular para dividir la cadena correctamente
        const regex = /(?:\[([^\]]+)\])|(\w+)/g;

        // Iterar sobre cada coincidencia de la cadena
        while ((match = regex.exec(nameConstants)) !== null) {
            // Si el grupo 1 contiene un índice de matriz, accede a esa propiedad del objeto
            if (match[1] !== undefined) {
                valor = valor[match[1]];
            } else {
                // De lo contrario, accede a la propiedad del objeto
                valor = valor[match[2]];
            }

            // Si en algún punto el valor es indefinido, detén la iteración
            if (valor === undefined) {
                break;
            }
        }
        return valor;
    }
}
