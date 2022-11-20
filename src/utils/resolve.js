const resolve = {
    makeReactSelectOptions: (array) => {
        return array?.map(item => {
            return { value: item, label: item }
        })
    }
}

export default resolve;