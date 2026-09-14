#ifndef Pins_Arduino_h
#define Pins_Arduino_h

#include <stdint.h>

#define EXTERNAL_NUM_INTERRUPTS 16
#define NUM_DIGITAL_PINS        40
#define NUM_ANALOG_INPUTS       16

#define analogInputToDigitalPin(p)  (((p)<20)?(esp32_adc2gpio[(p)]):-1)
#define digitalPinToInterrupt(p)    (((p)<40)?(p):-1)
#define digitalPinHasPWM(p)         (p < 34)

static const uint8_t TX = 1;
static const uint8_t RX = 3;

static const uint8_t SDA = 21;
static const uint8_t SCL = 22;

static const uint8_t SS    = 5;
static const uint8_t MOSI  = 23;
static const uint8_t MISO  = 19;
static const uint8_t SCK   = 18;

static const uint8_t A0 = 36;
static const uint8_t A3 = 39;
static const uint8_t A4 = 32;
static const uint8_t A5 = 33;
static const uint8_t A6 = 34;
static const uint8_t A7 = 35;
static const uint8_t A10 = 4;
static const uint8_t A11 = 0;
static const uint8_t A12 = 2;
static const uint8_t A13 = 15;
static const uint8_t A14 = 13;
static const uint8_t A15 = 12;
static const uint8_t A16 = 14;
static const uint8_t A17 = 27;
static const uint8_t A18 = 25;
static const uint8_t A19 = 26;

static const uint8_t T0 = 4;
static const uint8_t T1 = 0;
static const uint8_t T2 = 2;
static const uint8_t T3 = 15;
static const uint8_t T4 = 13;
static const uint8_t T5 = 12;
static const uint8_t T6 = 14;
static const uint8_t T7 = 27;
static const uint8_t T8 = 33;
static const uint8_t T9 = 32;

static const uint8_t DAC1 = 25;
static const uint8_t DAC2 = 26;

#ifdef __cplusplus
// analogWrite() compatibility shim.
//
// The arduino-esp32 core bundled with KBIDE is an old version (ARDUINO=10605)
// that never implemented analogWrite() — real ESP32 boards use the LEDC PWM
// API (ledcSetup/ledcAttachPin/ledcWrite) instead. The minigathering library's
// motor.h calls analogWrite() directly for motor speed control, so without
// this it fails to compile with "'analogWrite' was not declared in this
// scope". This shim maps analogWrite(pin, 0-255) onto LEDC channels 12-15,
// deliberately kept clear of the low channel numbers (0-11) that
// ESP32Servo/ESP32PWM allocate from for servo_base/servo_gripper, so the
// drive motors and the arm servos never fight over the same PWM channel.
extern "C" {
  double ledcSetup(uint8_t channel, double freq, uint8_t resolution_bits);
  void   ledcWrite(uint8_t channel, uint32_t duty);
  void   ledcAttachPin(uint8_t pin, uint8_t channel);
}

static uint8_t _mg_analogWrite_pins[4];
static uint8_t _mg_analogWrite_count = 0;

inline void analogWrite(uint8_t pin, int value) {
  int8_t channel = -1;
  for (uint8_t i = 0; i < _mg_analogWrite_count; i++) {
    if (_mg_analogWrite_pins[i] == pin) {
      channel = 12 + i;
      break;
    }
  }
  if (channel < 0) {
    if (_mg_analogWrite_count >= 4) return;  // out of reserved channels
    channel = 12 + _mg_analogWrite_count;
    _mg_analogWrite_pins[_mg_analogWrite_count] = pin;
    _mg_analogWrite_count++;
    ledcSetup(channel, 5000, 8);
    ledcAttachPin(pin, channel);
  }
  if (value < 0) value = 0;
  if (value > 255) value = 255;
  ledcWrite(channel, value);
}
#endif /* __cplusplus */

#endif /* Pins_Arduino_h */
