import { Checkbox, List, ListItem, ListItemText, Stack } from "@mui/material";

import { useState } from "react";

const SymptomSelect = ({ symptoms, selectedSymptoms, setSelectedSymptoms }) => {
  const handleToggle = (symptom) => () => {
    const currentIndex = selectedSymptoms.findIndex((s) => s.id === symptom.id);
    const newSelectedSymptoms = [...selectedSymptoms];

    if (currentIndex === -1) {
      newSelectedSymptoms.push({ id: symptom.id, name: symptom.name });
    } else {
      newSelectedSymptoms.splice(currentIndex, 1);
    }

    setSelectedSymptoms(newSelectedSymptoms);
  };

  return (
    <Stack
      spacing={2}
      sx={{ borderWidth: 1, borderStyle: "solid", borderRadius: 2, padding: 2 }}
    >
      <List subheader="Semptomlarınızı Seçiniz">
        {symptoms.map((symptom, index) => (
          <ListItem
            key={index}
            dense
            button
            onClick={handleToggle(symptom)}
            disablePadding
          >
            <Checkbox
              edge="start"
              checked={selectedSymptoms.some((s) => s.id === symptom.id)}
              tabIndex={-1}
              disableRipple
            />
            <ListItemText primary={symptom.name} />
          </ListItem>
        ))}
      </List>
    </Stack>
  );
};

export default SymptomSelect;

