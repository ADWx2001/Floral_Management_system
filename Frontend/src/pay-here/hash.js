import md5 from 'crypto-js/md5';

export default function generateHash (){
    let merchantSecret;
    let merchantId;
    let orderId;
    let amount;
    let hashedSecret    = md5(merchantSecret).toString().toUpperCase();
    let amountFormated  = parseFloat( amount ).toLocaleString( 'en-us', { minimumFractionDigits : 2 } ).replaceAll(',', '');
    let currency        = 'LKR';
    let hash            = md5(merchantId + orderId + amountFormated + currency + hashedSecret).toString().toUpperCase();

    return hash;
}



