import React from "react";
import { Card } from "../ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const Faq = () => {
  return (
    <div className="w-1/2 flex flex-col gap-6">
      <h2 className="text-primary font-semibold">FAQs</h2>
      <Card className="p-4">
        <Accordion type="single" collapsible className="w-full">
          {data.map((data) => (
            <AccordionItem key={data.id} value={data.question}>
              <AccordionTrigger>{data.question}</AccordionTrigger>
              <AccordionContent>{data.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>
    </div>
  );
};

export default Faq;

const data = [
  {
    id: 1,
    question: "What is Kaustubha?",
    answer:
      "Kaustubha is a specialized platform designed for pregnant women to book appointments with doctors and chat with them directly. It provides continuous access to medical professionals, ensuring that expectant mothers receive timely advice and support. The platform is dedicated to promoting health and well-being during pregnancy.",
  },
  {
    id: 2,
    question: "What payment methods are accepted?",
    answer:
      "Kaustubha accepts a variety of payment methods to accommodate different preferences. You can use major credit and debit cards, PayPal, and other popular online payment systems. This flexibility ensures that you can choose the most convenient and secure payment option for you.",
  },
  {
    id: 3,
    question: "How do I subscribe to a service on Kaustubha?",
    answer:
      "To subscribe to a service on Kaustubha, visit the official website and sign up by creating an account. Follow the instructions to select the service you need, choose your preferred subscription plan, and complete the payment process. Once subscribed, you can easily book appointments and chat with doctors.",
  },
  {
    id: 4,
    question: "How do I set goals?",
    answer:
      "To set goals, simply log in to your account and navigate to the 'Goals' section. From there, you can set new goals and track your progress towards them.",
  },
  {
    id: 5,
    question: "Is customer support available 24/7?",
    answer:
      "Yes, customer support on Kaustubha is available 24/7. This ensures that pregnant women can receive assistance at any time, day or night. Whether you have questions about appointments, need help with the platform, or require urgent support, our team is always ready to help.",
  },
];
