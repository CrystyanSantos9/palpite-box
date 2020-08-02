import { GoogleSpreadsheet } from 'google-spreadsheet'
import moment from 'moment'

const doc = new GoogleSpreadsheet(process.env.SHEET_DOC_ID)

const fromBase64 = value =>{
    const buff = Buffer.from(value,'base64')
    return buff.toString('ascii')
}

export default async (req, res) => {

    const genCupom = () => {
        const code = parseInt(moment().format('YYMMDDHHmmssSSS')).toString(16).toUpperCase()
        return code.substr(0,4) +'-'+ code.substr(4,4) + '-'+ code.substr(8,4)
    }

    try {

        await doc.useServiceAccountAuth({
            client_email:process.env.SHEET_CLIENT_EMAIL,
            private_key:fromBase64(process.env.SHEET_PRIVATE_KEY)
            })

        await doc.loadInfo()

        const sheet = doc.sheetsByIndex[1]

        const data = JSON.parse(req.body)

        const sheetConfig = doc.sheetsByIndex[2] 
        await sheetConfig.loadCells('A2:B2')
        const mostrarPromocaoCell = sheetConfig.getCell(1,0)
        const textoCell = sheetConfig.getCell(1,1)

        let CUPOM = ''
        let PROMO = ''

        if(mostrarPromocaoCell.value==='VERDADEIRO'){
            CUPOM = genCupom()
            PROMO = textoCell.value
        }

        await sheet.addRow({
            NOME: data.Nome,
            EMAIL: data.Email,
            WHATSAPP: data.Whatsapp,
            COMENTARIO:data.Comentario,
            CUPOM,
            PROMO,
            'DATA PREENCHIMENTO': moment().format('DD/MM/YYYY, HH:mm:ss'),
            NOTA:parseInt(data.Nota)
           
        })

        res.end(JSON.stringify({
            showCupom: CUPOM !=='',
            CUPOM,
            PROMO
        }))


    } catch (err) {
        res.end('error')
    }

}