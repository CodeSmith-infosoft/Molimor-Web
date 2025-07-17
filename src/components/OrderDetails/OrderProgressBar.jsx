import React from "react";

const OrderProgressBar = ({ currentStep, progressPercentage = 0 }) => {
  const steps = [
    { id: 1, label: "Order received" },
    { id: 2, label: "Processing" },
    { id: 3, label: "On the way" },
    { id: 4, label: "Delivered" },
  ];

  // Validate and normalize percentage
  const validPercentage = Math.max(0, Math.min(100, progressPercentage));

  return (
    <div>
      {/* Progress Bar */}
      <div className="progres">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.id;
          const isActive = currentStep === step.id;

          return (
            <div key={step.id} className="progres__step">
              <div
                className={`progres__circle ${isCompleted || isActive ? "active" : ""}`}
              >
                {isCompleted ? "✓" : `0${step.id}`}
              </div>

              {index < steps.length - 1 && (
                <div className="progres__line-container">
                  <div
                    className={`progres__line ${isCompleted ? "filled" : ""}`}
                  />
                  {isActive && validPercentage > 0 && (
                    <div
                      className="progres__line progress-partial"
                      style={{ width: `${validPercentage}%` }}
                    />
                  )}
                </div>
              )}

              <div className="progres__label">{step.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderProgressBar;
