const uploadDrools = async (file) => {

    await delay(2000)
    return {"code": 200, "message": "File has been uploaded"};
}

const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
)

export {uploadDrools};