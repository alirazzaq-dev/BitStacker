import { Box, Flex, Spinner } from "@chakra-ui/react";


export const ValidateEmail = (email: string) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return (true)
    }
    return (false)
}

export const ValidateBitcoinAddress = (address: string) => {
    if (/([13]|bc1)[A-HJ-NP-Za-km-z1-9]{27,34}/.test(address)) {
        return (true)
    }
    return (false)
}

export const getLoader = (text: string) => {
    return (
        <Flex
            alignItems="center"
            justifyContent="center"
            h={50}
        >
            <Box mr={5}> {text} </Box> <Spinner size="lg" />
        </Flex>
    )
}


export const NetworkName: {[key: number]: string} = {
    1: "Mainnet",
    5: "Goerli Testnet",
}