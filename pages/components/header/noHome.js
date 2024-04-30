import {
    Flex,
    Heading,
    Avatar,
    AvatarGroup,
    Text,
    Icon,
    IconButton,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Divider,
    Box,
    Button,
    Input,
    InputGroup,
    InputLeftElement,
    Center
} from '@chakra-ui/react'

import { 
    FiHome,
    FiPieChart,
    FiDollarSign,
    FiBox,
    FiCalendar,
    FiChevronDown,
    FiChevronUp,
    FiPlus,
    FiCreditCard,
    FiSearch,
    FiBell,
    FiMessageCircle,
    FiArrowLeftCircle
 } from 'react-icons/fi'

 import { useRouter } from 'next/router'

 const NoHome = ({ linknya, menu, provider, rate }) =>  {
    const router = useRouter()
    return(
        <>
        
     <Flex
                w={["100%", "100%", "100%"]}
                bgColor="#9C27B0"
                flexDir="column"
                overflow="auto"
                position="fixed"
                zIndex={'3'}
                minW={[null, null, "400px", "400px", "400px"]}
            >
                <Flex alignContent="center" m={0} p={3}>
                    
                        <InputGroup mr={2}>
                            {
                                linknya ? 
                                <Box>
                                </Box>
                                :
                                <Box onClick={() => router.back()}>
                                     <InputGroup ml={2}>
                                    <FiArrowLeftCircle  color='white' fontSize={'25px'} ps={'10px'}/>
                                </InputGroup>
                                </Box>
                            }
 
                           
                        </InputGroup>

                        <Text textAlign={'center'} fontWeight={'bold'} fontSize={'md'} color={'white'} width={'100%'}>
                                {provider ? provider+'('+rate+')' : menu ? menu : 'KITAB PUPUT'}
                        </Text>

                        <InputGroup mb={3} mr={2}>
                            
                        </InputGroup>
                    
                 </Flex>
                 </Flex>
        </>
    )
}

export default NoHome