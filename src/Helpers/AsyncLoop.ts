const AcyncLoop = (data: any[], callback: any) => {
            return new Promise((r) => {
                processData(data, callback, () => {
                    r(null)
                })
            })
        }
        let i = 0
        const processData = async (data: any[], callback: any, onDone: any) => {
            let obj = data[i]
            if (obj) {
                await callback(obj)
                i++
                processData(data, callback, onDone)
            } else {
                onDone()
            }
        }
        export default AcyncLoop