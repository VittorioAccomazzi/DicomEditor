# Dicom Editor

The aim of this application is to create a web page which allows to change the DICOM Tag of a set of DICOM file. I decided to write this application because on mac there are no simple application to edit a DICM file. Being on a web page, this will be available on mac, a well as pc and mobile.
This is **not* an anonymizer ad shall not be used as such. There are a number of TAG which might contain PHI that are not necessarily displayed by the application. 

The application is available on line here:
 🖐 To do !!

## Key feature
- All the processing is local on our browser. Images are not uploaded nor processed anywhere. 
- You can change tag for multiple studies and multiple patients at the same time.
- The ammount of data to process is only limited by the memory of the browser. On my mac I can easily process thousands of images. The processing minimizes the memory usage.

## Limitations
- When downloading the images, the system is slow: about 3 images/sec. Unfortunately, this is a limitation due to the browser. Chrome will not be able to download images faster (I tested)
- The application doesn't render the images.
- I rely on the DICOM parsing to [dcmjs](https://github.com/dcmjs-org/dcmjs), which is still under work. Therefore, you might run in some limitation/bug.
- mostly tested on Chrome.
