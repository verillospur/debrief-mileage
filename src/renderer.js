//
// renderer.js
//
'use strict'

const { render } = require("ejs");

const RENDERER_TYPES = {
    default: '',
    posts: 'posts',
    mileagedata: 'mileagedata',
    junk: 'junk',
    __names: ['', 'posts', 'mileagedata', 'junk']
};

class renderer {
    constructor(type) {
        this._type = type;
    }

    render(data) {
        switch (this._type) {
            case RENDERER_TYPES.posts:
                return this.render_posts(data);
                break;
                
            case RENDERER_TYPES.mileagedata:
                return this.render_mileagedata(data);
                break;
                
            case RENDERER_TYPES.junk:
                return this.render_junk(data);
                break;

            case RENDERER_TYPES.default:
            default:
                return data.toString();
                break;
        }
    }

    render_posts(data) {
        return `${data.getAllData()}`;
    }

    render_mileagedata(data) {
        return `${data}`;
    }

    render_junk(data) {
        return `NOT PROCESSED: ${data}`;
    }

    get type() {
        return this._type;
    }
    set type(v) {
        this._type = v;
    }
}

module.exports = renderer;