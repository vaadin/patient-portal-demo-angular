import {Component} from "@angular/core";
@Component({
  template: `<div class="container">
                <p>fail.</p>
             </div>`,
  styles: [`
    .container {
      display: flex;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left:0;
      justify-content: center;
      align-items: center;
    }
    
    p {
      font-family: Menlo, Monaco, Consolas, "Courier New", monospace;
      font-weight: bold;
      font-size: 60px;
    }
`]
})
export class PageNotFoundComponent {

}
