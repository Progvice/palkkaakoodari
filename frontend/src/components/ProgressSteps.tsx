export type StepProps = {
  title: string,
  description: string,
  number?: number,
  stepAmount?: number
};

type ProgressStepsProps = {
  steps: StepProps[]
}

const getStepWidth = (stepAmount: number) => {
  let stepWidth;
  switch (stepAmount) {
    case 1:
      stepWidth = "w-full";
    break;
    case 2:
      stepWidth = "w-[50%]";
    break;
    case 3:
      stepWidth = "w-[33.33333%]";
    break;
    case 4:
      stepWidth = "w-[25%]";
    break;
    case 5:
      stepWidth = "w-[20%]";
    break;
    default:
      stepWidth = "w-[33.33333%]";
    break;
  }

  return stepWidth;
}

export const Step : React.FC<StepProps> = (props) => {
  const {title, description, number, stepAmount} = props;
  const stepWidth = getStepWidth(stepAmount ? stepAmount : 1);

  return (
    <div className={`${stepWidth} flex flex-col items-center border border-theme-grey relative pt-[38px] px-4`}>
      <div className="border-[2px] border-theme-blue w-[64px] h-[64px] rounded-full flex items-center justify-center absolute bg-white top-[-32px]">
        <p className="text-2xl text-theme-blue font-bold">{number ? (number + 1) : 1}</p>
      </div>
      <p className="text-base font-bold text-center w-full">{title}</p>
      <p className="text-base text-center my-4">{description}</p>
    </div>
  )
}

const ProgressSteps : React.FC<ProgressStepsProps> = (props) => {
  const {steps} = props;

  const stepAmount = steps.length;

  return (
    <div className="w-full flex flex-row gap-8 pt-16 pb-8">{
      steps ? steps.map((step, index) => {
        return <Step stepAmount={stepAmount} title={step.title} description={step.description} number={index} key={index}/>
      }) : null
    }</div>
  )
}

export default ProgressSteps;
