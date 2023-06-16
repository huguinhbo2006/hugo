const fs = require('fs');
const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const SESSION_FILE_PATH = './session.js';
const CODIGO_PAIS = "521";
const numero = "3335893912";
const servidor = "lumiere"

const { Router } = require('express');
const router = Router();

let sessionData;
if (fs.existsSync(SESSION_FILE_PATH)) {
    sessionData = require(SESSION_FILE_PATH)
}

const cliente = new Client({
    authStrategy: new LocalAuth({
        clientId: servidor //Un identificador(Sugiero que no lo modifiques)
    })
});

cliente.on('authenticated', (session) => {
    sessionData = session;
    //fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => err && console.error(err));
});

cliente.initialize();

cliente.on('qr', qr => {
    console.log("qr " + servidor);
    qrcode.generate(qr, { small: true });
});

cliente.on('ready', () => {
    console.log(servidor + " corriendo correctamente");
});

cliente.on('auth_failure', mnj => {
    try {
        console.error("Error al enviar mensaje " + mnj);
    } catch (error) {
        console.log(error);
    }
});

cliente.on('message', msg => {

});

router.get(`/${servidor}/mensaje`, function(req, res) {
    let chatID = CODIGO_PAIS + numero + "@c.us";
    cliente.sendMessage(chatID, `Mensaje de prueba de ${servidor}`).then(respuesta => {
        if (respuesta.id.fromMe) {
            console.log(`${servidor} su mensaje fue enviado`);
        }
        res.status(200).json(`${servidor} su mensaje fue enviado`);
    });
});

router.post(`/${servidor}/mensaje`, function(req, res) {
    try {
        if (req.body.telefono.length === 10) {
            let chatID = CODIGO_PAIS + req.body.telefono + "@c.us";
            cliente.sendMessage(chatID, req.body.mensaje).then(respuesta => {
                if (respuesta.id.fromMe) {
                    console.log('El mensaje fue enviado desde ' + servidor);
                }
            });
            res.status(200).json('Todo corecto');
        }
    } catch (error) {
        console.log("Mal");
        res.status(400).json('Todo MAL');
    }
});

module.exports = router;