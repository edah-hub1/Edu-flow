import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Header } from "../header/header";
import { Footer} from "../footer/footer";
import { FeaturedCourses } from "../featured-courses/featured-courses";
import { CallToAction } from "../call-to-action/call-to-action";
import { Hero } from "../hero/hero";

@Component({
  selector: "app-landing-page",
  standalone: true,
  imports: [
    CommonModule,
    Header,
    Footer,
    FeaturedCourses,
    CallToAction,
    Hero
  ],
  templateUrl: "./landing-page.html",
  styleUrls: ["./landing-page.css"]
})
export class LandingPage {}
