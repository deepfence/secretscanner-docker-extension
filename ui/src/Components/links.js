import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import {GitHub} from '@mui/icons-material/';

export default function Links(props) {
    let {ddClient} = props
    const handleSSGithub = () => handleClick("https://github.com/deepfence/SecretScanner")
    const handleTMGithub = () => handleClick("https://github.com/deepfence/ThreatMapper")

    const handleClick = (url) => {
        { ddClient.host.openExternal(url) };
    }
     return (
         <Stack direction="row" spacing={1} mt={1}>
             <Chip icon={<GitHub />}
                label="deepfence/SecretScanner"
                variant="outlined"
                onClick={handleSSGithub}
                clickable
             />
             <Chip icon={<GitHub />}
                label="deepfence/ThreatMapper"
                variant="outlined"
                onClick={handleTMGithub}
                clickable
             />
         </Stack>
    );
}