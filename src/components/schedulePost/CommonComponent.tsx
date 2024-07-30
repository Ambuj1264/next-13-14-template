import { ButtonFlex } from "@/shared/UserMenu/SharedUserMenuComponents";

interface ActionButton {
  button: JSX.Element;
}

export const FooterComponent = ({ data }: { data: ActionButton[] }) => {
  return (
    <ButtonFlex>
      {data?.map((item: { button: any }) => {
        return <>{item.button}</>;
      })}
    </ButtonFlex>
  );
};
