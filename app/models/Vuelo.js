// grab the mongoose module
var mongoose = require('mongoose');

// define our nerd model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Vuelo', {
	//_id: {type: mongoose.Schema.Types.ObjectId, required: false},
	//_id: Number,
    aerolinea: String,
    ciudad_origen: String,
    ciudad_destino: String,
    fecha_salida: {type: Date, default: Date.Now},
    fecha_llegada: {type: Date, default: Date.Now},
});
