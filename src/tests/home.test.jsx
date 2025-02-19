import {render, screen} from "@testing-library/react";
import {Hero, Home} from "../pages/home"

it("sample test", ()=> {
  render(<Home/>)
  const joinBtn = screen.queryByRole("button", {name:/join for free/i})
  expect(joinBtn).toBeVisible()
})