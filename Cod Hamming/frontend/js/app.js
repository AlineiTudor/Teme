var nb = 0;
var app = new Vue({
    el: '#hamming-encoder',
    data: {
        dataBits: [],
        status: '',
        numberOfDataBits: nb,
    },
    created: function() {
        this.initDataBits(this.numberOfDataBits);
    },
    methods: {
        takeNoBits: function() {
            nb = document.getElementById("n_bits").value;
        },
        initDataBits: function() {
            this.dataBits = [];
            for (var i = 0; i < this.numberOfDataBits; i++) {
                var bit = { data: null };
                this.dataBits.push(bit);
            }
        },
        send: function() {
            if (this.validate(this.dataBits) === true) {
                var encodedMessage = this.encode(this.dataBits);

                return axios.put("http://localhost:3000/message", { bits: encodedMessage }).then(
                    response => (this.status = response.data));
            } else {
                this.status = 'Input is not valid. Please use 0 or 1 as data bit values';
            }
        },
        encode: function(bits) {
            var v = [];
            let index_v = 0;
            for (let i = 0; i < bits.length;) {
                if (this.isPowerOfTwo(index_v + 1)) {
                    v.push(0);
                    index_v++;
                } else {
                    v.push(parseInt(bits[i].data));
                    index_v++;
                    i++;
                }
            }

            for (let i = 1; i <= v.length; i *= 2) {
                for (let a = i; a <= v.length; a += i * 2) {
                    for (let j = 0; j < i && a + j <= v.length; j++) {
                        v[i - 1] += v[a - 1 + j];
                    }
                }
                v[i - 1] = this.parity(v[i - 1]);
            }
            console.log("New lines of control bits: ")
            for (let i = 1; i <= v.length; i *= 2) {
                console.log("Control bit: " + i + " " + v[i - 1]);
            }
            return v;
        },
        parity: function(number) {
            return number % 2;
        },
        validate: function(bits) {
            for (var i = 0; i < bits.length; i++) {
                if (this.validateBit(bits[i].data) === false)
                    return false;
            }
            return true;
        },
        validateBit: function(character) {
            if (character === null) return false;
        },

        isPowerOfTwo: function(n) {
            let x = n;
            while (x != 1 && x > 1) {
                x /= 2;
            }
            if (x == 1) {
                return true;
            } else {
                return false
            }
        },
    }
});