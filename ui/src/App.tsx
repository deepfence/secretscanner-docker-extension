import React from 'react';
import {Divider, Typography} from '@mui/material';
import ImageSearch from "./Components/ImageSearch";

import {createDockerDesktopClient} from '@docker/extension-api-client';
import SecretTable from './Components/secret-table';
import {Box} from '@mui/system';
import FullScreenDialog from './Components/details-dialog';
import Links from './Components/links';

// import {} from './assets/images/';

// Note: This line relies on Docker Desktop's presence as a host application.
// If you're running this React app in a browser, it won't work properly.
const client = createDockerDesktopClient();

function useDockerDesktopClient() {
    return client;
}

interface response {
    Message: string;
}

interface message {
    Timestamp: string
    "Image Name": string
    "Image ID": string
    "Container ID": string
    Secrets: Secret[]
}

interface Secret {
    "Image Layer ID": string
    "Matched Rule ID": number
    "Matched Rule Name": string
    "Matched Part": string
    "Signature to Match": string
    Severity: string
    "Severity Score": number
    "Relative Starting Index of Match in Displayed Substring": number
    "Relative Ending Index of Match in Displayed Substring": number
    "Full File Name": string
    "Matched Contents": string
    "Starting Index of Match in Original Content"?: number
}

export function App() {
    const [response, setResponse] = React.useState<Secret[]>();
    const ddClient = useDockerDesktopClient();
    const [open, setOpen] = React.useState(false);
    const [row, setRow] = React.useState({})

    const handleClickOpen = (row) => {
        setOpen(true);
        setRow(row)
    };

    const handleClose = () => {
        setOpen(false);
    };

    const fetchAndDisplayResponse = async (image, setLoading) => {
        setLoading(true)
        setResponse(null)
        await ddClient.extension.vm?.service?.post('/secret-scan/scan', {
            "image_name": image,
        })
            .then((result: any) => {
                let r: response = JSON.parse(JSON.stringify(result))
                let q: message = JSON.parse(r.Message)
                setResponse(q.Secrets);
                ddClient.desktopUI.toast.success('Secret scanning finished!');
                setLoading(false)
            })
            .catch(err => {
                setLoading(false)
                ddClient.desktopUI.toast.error('Error scanning image, check console for errors');
                console.error('error', err)
            })
    };

    return (
        <>
            <Box sx={{marginTop: '2rem'}}>
                <Box sx={{m: '2rem', marginBottom: '1rem'}}>
                    <Box sx={{display: 'flex'}}>
                        <img style={{marginTop: '0.5rem'}} src="images/deepfence.svg" alt="Deepfence Logo"
                             height="60px"/>
                        <Box sx={{marginLeft: '1.5rem', marginTop: '0rem'}}>
                            <Typography variant="h3">Deepfence SecretScanner</Typography>
                            <Typography variant="body1" color="text.secondary" sx={{mt: 2}}>
                                Deepfence SecretScanner can find unprotected secrets in container images or file
                                systems.
                            </Typography>

                            <Typography variant="body1" color="text.secondary" sx={{mt: 0}}>
                                Select the image from the dropdown and scan for secrets.
                            </Typography>
                            <Links ddClient={ddClient}/>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <ImageSearch onChange={fetchAndDisplayResponse}/>
            <Divider style={{marginTop: 10, marginBottom: 10}}/>
            {response && <SecretTable
                rows={response}
                handleClickOpen={handleClickOpen}
            />}
            <FullScreenDialog
                open={open}
                handleClose={handleClose}
                row={row}
            />
        </>
    );
}
