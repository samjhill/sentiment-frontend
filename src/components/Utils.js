// Converts uint8 json array to hex string
function RHashArrayToHexString(rhash)
{
    return rhash.map(function(i) {
        return ('0' + i.toString(16)).slice(-2);
    }).join('');
}

function ParseAxiosError(error)
{
    if (error.response)
        // Server responded
        return error.response.data;
    else
        // Server did not respond
        return error.message;
}

function GetTransactionURL(txid)
{
    return 'https://www.smartbit.com.au/tx/' + txid;
}

export {
    RHashArrayToHexString,
    ParseAxiosError,
    GetTransactionURL
}
