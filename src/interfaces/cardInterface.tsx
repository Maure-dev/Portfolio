import { CardInterfaceType } from "../containers/entities/entities";

const Root = ({ children, className, onClick }: CardInterfaceType) => {
  return (
    <div className={`${className ? className : ""}`} onClick={onClick}>
      {children}
    </div>
  );
};

const Title = ({ name, className }: CardInterfaceType) => {
  return (
    <h4
      className={`text-xl font-bold mb-10  ${className ? className : ""}`}
      data-mirage-key={name}
    ></h4>
  );
};

const Content = ({ children, className, onClick }: CardInterfaceType) => {
  return (
    <div className={`${className ? className : ""}`} onClick={onClick}>
      {children}
    </div>
  );
};

export const Card = {
  Root,
  Title,
  Content,
};
