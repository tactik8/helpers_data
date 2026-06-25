

import { addressService } from './address/address.js'
import { arrayService } from './array/array.js'
import { dateService } from './date/date.js'
import { emailService } from './email/email.js'
import { nullService } from './null/null.js'
import { phoneService } from './phone/phone.js'
import { stringService } from './string/string.js'
import { urlService } from './url/url.js'
import { uuidService } from './uuid/uuid.js'

export const helpers_data = {
    address: addressService,
    array: arrayService,
    date: dateService,
    email: emailService,
    null: nullService,
    phone: phoneService,
    string: stringService,
    url: urlService,
    uuid: uuidService

}



