/**
 * 
 * @memberof js.sufragio.extension
 */
class TemplateMedialuna extends Templates {

    /**
     * Devuelve el nombre del template de la tarjeta de confirmacion
     *
     * @param {*} candidato - El candidato a crearle el botón.
     * @param {*} categoria - La categoria a crearle el botón.
     * @returns {String} Nombre del template que se usa en la confirmacion
     */
    __get_template_name_confirmacion(candidato, categoria) {
        //registra partial que usa el template de confirmacion confirmacion_tarjeta
        Handlebars.registerPartial(
            "componenteConfirmacion",
            get_template_desde_cache(
                template_name_componente_confirmacion(candidato, categoria)
            )
        );
        return "confirmacion_tarjeta";


        function template_name_componente_confirmacion(candidato, categoria) {
            if (candidato.blanco || candidato.clase === "Blanco")
                return "confirmacion_candidato_blanco";
            if (categoria.consulta_popular) return "confirmacion_consulta_popular";

            const tiene_preferentes =
                localController.businessData.es_candidato_con_preferentes(
                    candidato
                );
            if (tiene_preferentes) return "confirmacion_con_preferentes";

            return "confirmacion";
        }
    }

}

templateClass = new TemplateMedialuna(get_modo());
