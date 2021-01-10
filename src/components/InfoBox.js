import React, { useEffect } from 'react'
import { Card,CardContent,Typography } from '@material-ui/core'
import './InfoBox.css';
import Aos from 'aos';
import 'aos/dist/aos.css';
function InfoBox({title,cases,total,css,aos}) {
    useEffect(() =>{
        Aos.init({duration:2000});
    },[]);
    return (
        <Card  data-aos="fade-right"  className="infoBox">
            <CardContent>
                <Typography className={`infoBox__title${css}`} color="textSecondary">
                    {title}
                </Typography>

                <h2 className="infoBox__cases"> {new Intl.NumberFormat().format(cases)}</h2>
                <Typography className="infoBox__total" color="textSecondary">
                {new Intl.NumberFormat().format(total)} Total
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox
