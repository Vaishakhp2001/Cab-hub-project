import React from 'react'
import { Card, Button } from 'react-bootstrap'
import GooglePayButton from '@google-pay/button-react'

const Payment = () => {


    const cashPayment = () => {



    }

    return (


        <div>
            <Card style={{
                height: '14rem', marginTop: '11rem', width: '90%',
                marginLeft: '1.5rem', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
            }}>
                <Card.Header >
                    Payment
                </Card.Header>

                <Card.Body>
                    <Button style={{ width: '62%',marginBottom: '10px' }} onClick={cashPayment}>
                        Cash
                    </Button>
                    <GooglePayButton
                         environment="TEST"
                         paymentRequest={{
                           apiVersion: 2,
                           apiVersionMinor: 0,
                           allowedPaymentMethods: [
                             {
                               type: 'CARD',
                               parameters: {
                                 allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                                 allowedCardNetworks: ['MASTERCARD', 'VISA'],
                               },
                               tokenizationSpecification: {
                                 type: 'PAYMENT_GATEWAY',
                                 parameters: {
                                   gateway: 'example',
                                   gatewayMerchantId: 'exampleGatewayMerchantId',
                                 },
                               },
                             },
                           ],
                           merchantInfo: {
                             merchantId: '12345678901234567890',
                             merchantName: 'Demo Merchant',
                           },
                           transactionInfo: {
                             totalPriceStatus: 'FINAL',
                             totalPriceLabel: 'Total',
                             totalPrice: '100.00',
                             currencyCode: 'USD',
                             countryCode: 'US',
                           }
                           
                         }}
                         onLoadPaymentData={paymentRequest => {
                           console.log('load payment data', paymentRequest);
                         }}
                         buttonColor='white'
                    />
                </Card.Body>

            </Card>
        </div>
    )
}

export default Payment