'use strict';

var util = require('util');
var ModelAprendizaje = require('../../api/models/objAprendizaje');
const Responses = require('../helpers/responses');

/** 
 * Función para obtener un arreglo de objetivos de aprendizaje
 *
 * @author Israel Jasma
 * @exports getObjAprendizaje GET /aprendizajes
 * @param req Petición HTTP
 * @param res | 200 objetivo de aprendizaje | 404 No hay objetivo de aprendizaje | 500 Error al buscar |
 * @return {[objAprendizajes]} JSON con un objeto que contiene arreglo de Objeto objetivo de aprendizaje
 */
exports.getObjAprendizajes = (req, res) => {
    ModelAprendizaje.find({}, (err, objAprendizajes) => {

        if (err) return res.status(500).send({ message: "Error al realizar peticion: ${err}" });
        if (!objAprendizajes) return res.status(404).send({ message: 'No existe ningun objetivo de aprendizaje' });
        res.status(200).send({ objAprendizajes });
    });
}

/** 
 * Función para obtener un Objetivo de aprendizaje.
 *
 * @author Israel Jasma
 * @exports getObjAprendizaje GET /aprendizajes/{id}
 * @param req Petición HTTP, id de objAprendizaje en path
 * @param res | 200 objetivo de aprendizaje encontrada | 404 objetivo de aprendizaje no existe | 500 Error al buscar |
 * @return {objAprendizaje: objAprendizaje} JSON con una variable de valor Objeto objAprendizaje
 */
exports.getObjAprendizaje = (req, res) => {
    let id = req.swagger.params.id.value
    ModelAprendizaje.findById(id, (err, objAprendizaje) => {

        if (err) return res.status(500).send({ message: 'Error al realizar peticion: ${err}' });
        if (!objAprendizaje) return res.status(404).send({ message: 'El objetivo de aprendizaje no existe' });
        res.status(200).send({ objAprendizaje: objAprendizaje });

    });
}

/** 
 * Función para eliminar un Objetivo de aprendizaje.
 *
 * @author Israel Jasma
 * @exports deleteObjAprendizaje DELETE /aprendizajes/{id}
 * @param req Petición HTTP, id de objAprendizaje en Path
 * @param res | 200 Objetivo de aprendizaje eliminada | 500 Error al buscar | 404 El objetivo de aprendizaje no existe |
 * @return {message:mensaje} JSON con mensaje
 */
exports.deleteObjAprendizaje = (req, res) => {
    let id = req.swagger.params.id.value;
    ModelAprendizaje.findById(id, (err, objAprendizaje) => {

        if (err) return res.status(500).json({ message: `Error al borrar el objetivo de aprendizaje. Error: ${err}` });
        if (!objAprendizaje) {
            res.status(404).send(Responses.getError({ message: `El objetivo de aprendizaje de ID ${id} no existe` }));
            return;
        }
        objAprendizaje.remove(id, function (err, objAprendizaje) {
            if (err) {
                res.status(500).send(Responses.getError({ message: err.message }));
                return;
            }
            res.status(200).json(Responses.getSuccess({ message: `El objetivo de aprendizaje ${id} ha sido eliminado` }));
        });

    });
}

/** 
 * Función para actualizar un objetivo de aprendizaje.
 *
 * @author Israel Jasma
 * @exports updateObjAprendizaje PUT /aprendizajes/{id}
 * @param req Petición HTTP, id de objetivo de aprendizaje en path
 * @param res | 200 Objetivo de aprendizaje encontrada | 404 Objetivo de aprendizaje no existe | 500 Error al buscar |
 * @return {evaluacion} JSON Objeto objetivo de aprendizaje
 */
// Arreglar
exports.updateObjAprendizaje = (req, res) => {
    let id = req.swagger.params.id.value;
    ModelAprendizaje.findById(id, (err, objAprendizaje) => {

        if (err) {
            res.status(500).send(Responses.getError({ message: err.message }));
            return;
        }
        if (!objAprendizaje) {
            res.status(404).send(Responses.getError({ message: 'El objetivo de aprendizaje ${id} no existe' }));
            return;
        }
        objAprendizaje = Object.assign(objAprendizaje, req.body);
        objAprendizaje.save(id, (err, objAprendizaje) => {
            if (err) {
                res.status(500).send(Responses.getError({ message: err.message }));
                return;
            }
            res.json(objAprendizaje);
        });

    });
}

/** 
 * Función para insertar un objetivo de aprendizaje
 *
 * @author Israel Jasma
 * @exports postObjAprendizaje POST /aprendizajes
 * @param req Petición HTTP, JSON Objeto objetivo de aprendizaje en Body
 * @param res | 200 Objetivo de aprendizaje creado | 500 Error al buscar |
 * @return {objAprendizaje} JSON Objeto objetivo de aprendizaje
 */
exports.postObjAprendizaje = (req, res) => {
    ModelAprendizaje.create(req.body, function (err, objAprendizaje) {

        objAprendizaje.save(function (err) {

            if (err) {
                res.status(500).send(Responses.getError({ message: err.message }));
                return;
            }
            res.status(200).json(objAprendizaje);

        })
    });
}