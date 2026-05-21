/**
 * 
 * @memberof js.sufragio.extension
 */
class TemplateEmpanada extends Templates {
    /**
     * Crea el boton para una lista.
     *
     * @param {*} boleta - un objeto con la informacion de la lista para la que se quiere crear el item de lista.
     * @param {Boolean} normal - Si el id de candidatura está en la boleta o dentro de la lista de la boleta.
     * @returns {*}
     *  @override
     */
    crear_item_lista(boleta, normal, preagrupada) {
        let template_data = this.__get_template_data_lista(
            boleta,
            normal,
            preagrupada
        );
        let template_name = this.__get_template_name_lista(template_data);
        const template = get_template_desde_cache(template_name);
        var item = template(template_data);
        return item;
    }

    /**
     * Devuelve el nombre del template para las listas
     * @override
     */
    __get_template_name_lista(template_data) {
        if (
            "mostrar_fotos_candididatos_boton_lista" in constants &&
            constants.mostrar_fotos_candididatos_boton_lista
        )
            return "lista";
        else return "lista_agrupacion_candidatos";
    }
    /*
     *
     * Devuelve los datos que necesita el template de lista
     *  @override
     */
    __get_template_data_lista(boleta, normal, preagrupada) {
        var id_lista = "lista_";
        if (normal) {
            id_lista += boleta.lista.id_candidatura;
        } else {
            id_lista += boleta.id_candidatura;
        }

        var seleccionado = "";
        if (this.__modo == "BTN_COMPLETA" && _categorias !== null) {
            if (_lista_seleccionada == boleta.lista.codigo) {
                seleccionado = "seleccionado";
            }
        }
        var candidatos =
            localController.businessData.get_candidatos_boleta(boleta);
        let template_data = this.__main_dict_base(id_lista);
        template_data.lista = { ...(normal ? boleta.lista : boleta) };
        template_data.lista.nombre_partido = boleta.partido
            ? boleta.partido.nombre
            : "";
        let limitar_candidatos =
            constants.limitar_candidatos.secundarios.boton_candidato;
        if (normal) {
            const candidato =
                normal[Object.keys(normal)[Object.keys(normal).length - 1]];
            template_data.lista.candidato = candidato.nombre
            if (limitar_candidatos !== null) {
                template_data.lista.secundarios = candidato.secundarios.slice(
                    0,
                    limitar_candidatos
                );
            } else {
                template_data.lista.secundarios = candidato.secundarios;
            }
        }
        template_data.normal = normal;
        template_data.seleccionado = seleccionado;
        template_data.preagrupada = typeof preagrupada !== "undefined" ? preagrupada : false;
        if (template_data.preagrupada) {
            const index = candidatos.findIndex((candidato) => candidato.cod_categoria === constants.agrupar_cargo);
            if (index>-1) candidatos.splice(index,1)
            else candidatos.splice(0,1)
        }
        template_data.alianza = boleta.alianza ? boleta.alianza : [];
        template_data.candidato_muestra_frente = false;
        if (
            typeof constants.candidato_muestra_frente != "undefined" &&
            constants.candidato_muestra_frente.includes(
                candidatos[0].id_candidatura
            )
        ) {
            template_data.candidato_muestra_frente = boleta.alianza
                ? true
                : false;
        }
        template_data.candidatos = candidatos;
        template_data.cantidad_candidatos = candidatos.length;
        template_data.clase_card_n_candidatos = "card-" + (candidatos.length) + "-candidatos";
        template_data.agrupacion_nivel_ubicacion =
            normal && boleta.agrupacion_nivel_ubicacion;
        if('numero' in boleta.lista && normal){
            template_data.lista.lista = {numero:boleta.lista.numero};
        }        
        return template_data;
    }

    /**
     * Devuelve los datos que necesita el template de candidato
     *
     * @param {*} candidato - El candidato a crearle el botón.
     * @param {*} seleccionado - Si el candidato está seleccionado o no.
     * @returns {*}
     */
    __get_template_data_candidato(candidato, seleccionado) {
        let template_data = super.__get_template_data_candidato(
            candidato,
            seleccionado
        );
        template_data.mostrar_secundarios = this.__es_cargo_con_secundarios(
            candidato.cod_categoria
        );
        template_data.mostrar_suplentes = this.__es_cargo_con_suplentes(
            candidato.cod_categoria
        );
        return template_data;
    }

    /**
     * Indica si es cargo con secundarios
     *
     * @param {number} cod_categoria - Codigo de la categoria sobre la que se quiere consultar
     * @returns {Boolean}
     */
    __es_cargo_con_secundarios(cod_categoria) {
        if (
            !("cargos_con_secundarios" in constants) ||
            constants.cargos_con_secundarios === null
        )
            return false;
        return constants.cargos_con_secundarios.includes(cod_categoria);
    }

    /**
     * Devuelve el nombre del template para un candidato
     *
     * @param {*} candidato - El candidato a crearle el botón.
     * @param {*} candidatos - Candidatos que se muestran en la misma pantalla
     * @returns {String} Nombre del template que usa el candidato
     */
    __get_template_name_candidato(candidato, candidatos) {
        let template_name = candidato.blanco ? "candidato_blanco" : "candidato_categoria";

        return template_name;
    }
}

templateClass = new TemplateEmpanada(get_modo());
