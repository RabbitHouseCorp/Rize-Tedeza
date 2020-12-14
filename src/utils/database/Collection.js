module.exports = class Collection {
    constructor(model) {
        this.model = model
    }

    /**
     * 
     * @param {string} id
     * @returns {*}
     */

    findOneById(id) {
        return this.findOne({ _id: id })
    }

    /**
     * 
     * @param {object} args
     */

    findOne(...args) {
        return this.model.findOne(...args)
    }

    /**
     * 
     * @param {string} id
     * @param {object} defaultValues
     * @returns {Promise<Promise|void|*>}
     */

    async getOrCreate(id, defaultValues = {}) {
        const data = await this.findOneById(id)
        if (!data) {
            this.model({ _id: id, ...defaultValues }).save()
        }
        return data
    }
    /**
     * 
     * @param {string} id 
     */
    async getAndDelete(id) {
        const data = await this.findOneById(id)
        if (data) {
            return this.model.findByIdAndDelete(id)
        } else {
            return undefined
        }
    }
}