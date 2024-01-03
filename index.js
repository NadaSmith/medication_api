const express = require('express');
const app = express ();
const PORT = process.env.PORT || 3000;

//require your json file
const medicationData = require('./medicationData.json');

app.get('/', (req, res) => {
    //homepage
    res.send('Welcome to the Medication API');
});

app.get('/medications', (req, res) => {
    //return entire medication data
    res.json(medicationData);
})

app.get('/medications/:category', (req, res) => {
    //return meds based on category
    const category = req.params.category;
    const filteredMedications = medicationData.filter((medication) => medication['Medication Category'] === category);
    res.json(filteredMedications);
});

app.get('/side-effects/generic/:genericName', (req, res) => {
    //return side effects on specific generic name
    const genericName = req.params.genericName;
    const medication = medicationData.find((medication) => medication["Generic Name"] === genericName);

    if (medication) {
        //access specific side effect properties
        const sideEffects = [medication['Side Effect 1'], medication["Side Effect 2"]].filter(Boolean);
        res.json(sideEffects);
    } else {
        console.log('Medication not found for the generic name:', genericName);
        res.json([])
    }
})

app.get('/side-effects/brand/:brandName', (req, res) => {
    //return side effects on specific brand name
    const brandName = req.params.brandName;
    const medication = medicationData.find((medication) => medication["Brand Name"] === brandName);

    if (medication) {
        //access specific side effect properties
        const sideEffects = [medication['Side Effect 1'], medication["Side Effect 2"]].filter(Boolean);
        res.json(sideEffects);
    } else {
        console.log('Medication not found for the brand name:', brandName);
        res.json([])
    }
})

app.get('/medication/generic/:genericName', (req, res) => {
    //return medication info by generic name
    const genericName = req.params.genericName;
    const medication = medicationData.find(
       (medication) => medication['Generic Name'] === genericName
    );
 
    if (medication) {
       res.json(medication);
    } else {
       res.json({});
    }
});

app.get('/medication/brand/:brandName', (req, res) => {
    //return medication info by brand name
    const brandName = req.params.brandName;
    const medication = medicationData.find(
       (medication) => medication['Brand Name'] === brandName
    );
 
    if (medication) {
       res.json(medication);
    } else {
       res.json({});
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});