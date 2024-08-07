import React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import "./LandingStepper.css";

const steps = [
  {
    label: "Crea tu cuenta",
    description:
      "Regístrate en la plataforma y obtén acceso a todas las funcionalidades.",
  },
  {
    label: "Crea el perfil de tu perrito",
    description:
      "Añade información y fotos de tu mascota para personalizar su perfil.",
  },
  {
    label: "Descarga la app en un celular Android",
    description:
      "Instala la aplicación en un dispositivo Android para comenzar.",
  },
  {
    label: "Escanea el QR de tu cuenta",
    description:
      "Escanea el código QR desde la aplicación para vincular tu cuenta.",
  },
  {
    label: "Presiona iniciar tracking en la app",
    description:
      "Inicia el seguimiento de tu mascota a través de la aplicación.",
  },
  {
    label: "Bloquea el celular e instálalo en la pechera ¡y listo!",
    description:
      "Coloca el dispositivo en la pechera de tu mascota y comienza a rastrear.",
  },
];

const CustomStepLabel = styled(StepLabel)({
  "& .MuiStepIcon-root": {
    fontSize: "2rem",
    color: "#f2a71b", // Default color
    "&.Mui-active": {
      color: "#0056b3", // Active step color
    },
    "&.Mui-completed": {
      color: "#0056b3", // Completed step color
    },
  },
});

export default function PetWatchStepper() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: "auto",
        backgroundColor: "white",
        padding: 4,
        borderRadius: 2,
        boxShadow: 2,
      }}
      className="mt-5"
    >
      <Typography
        variant="h4"
        align="center"
        sx={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 800,
          color: "#f2a71b",
          margin: 0,
          padding: 0,
        }}
        gutterBottom
      >
        Cómo empezar
      </Typography>

      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <CustomStepLabel>{step.label}</CustomStepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{
                      mt: 1,
                      mr: 1,
                      backgroundColor: "#0056b3",
                      color: "white",
                      "&:hover": { backgroundColor: "#d18a00" },
                    }}
                  >
                    {index === steps.length - 1 ? "Terminar" : "Continuar"}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{
                      mt: 1,
                      mr: 1,
                      backgroundColor: "#0056b3",
                      color: "white",
                      "&:hover": { backgroundColor: "#d18a00" },
                    }}
                  >
                    Atrás
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3, mt: 2 }}>
          <Typography>
            Todos los pasos han sido terminados, disfruta{" "}
          </Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Resetear
          </Button>
        </Paper>
      )}
    </Box>
  );
}
