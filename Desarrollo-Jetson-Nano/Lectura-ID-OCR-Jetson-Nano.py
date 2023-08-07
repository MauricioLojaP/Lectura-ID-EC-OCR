import RPi.GPIO as GPIO
import time
import cv2
import pytesseract
import numpy as np
import imutils
from argparse import ArgumentParser
from PIL import ImageTk, Image, ImageFilter
import re
from playsound import playsound
import requests
import uuid
import io

pytesseract.pytesseract.tesseract_cmd = r'/usr/bin/tesseract'
faceClassif = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BOARD)
inPin = 7
ledlight = 11
ledRed = 15
ledGreen = 13
GPIO.setup(inPin,GPIO.IN)
GPIO.setup(ledRed,GPIO.OUT)
GPIO.setup(ledGreen,GPIO.OUT)
GPIO.setup(ledlight,GPIO.OUT)

config = "-psm 1"


def captura():
    cap = cv2.VideoCapture(0)
    cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1920)
    cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 1080)
    cap.set(10,120)
    cap.set(11,50)
    cap.set(12,70)
    cap.set(13,13)
    cap.set(14,50)
    cap.set(15,-3)
    cap.set(17,5000)
    cap.set(28,0)
    ret,frame = cap.read()
    if ret == False:
        return False
    else:
        cv2.imwrite('image.jpg', frame)
        return True


def undistor(img):

    cameraMatrix= np.array([[7.00025706e+03, 0.00000000e+00, 8.11629264e+02], [0.00000000e+00, 7.42261178e+03 ,4.44845279e+02], [0.00000000e+00, 0.00000000e+00, 1.00000000e+00]])
    dist = np.array([[-1.72113686e+01, -4.06123836e+02, -1.89876262e-01, -2.58905805e-01,   2.63725473e+04]])
    h, w = img.shape[:2]
    newCameraMatrix, roi = cv2.getOptimalNewCameraMatrix(cameraMatrix, dist, (w,h),1,(w,h))
    dst = cv2.undistort(img, cameraMatrix, dist, None, newCameraMatrix)
    x, y, w, h = roi
    dst = dst[y:y+h, x:x+w]
    
    return (dst)


def checkID_function(img):
    reverseIDCard = False
    check = False

    image1 = img[10:160, 250:885]
    image2 = img[415:540, 250:820]
    ancho=image2.shape[1]
    alto=image2.shape[0]
    M=cv2.getRotationMatrix2D((ancho//2,alto//2),180,1)
    image2rot=cv2.warpAffine(image2,M,(ancho,alto))

    imagePrep1 = image_preprocess(image1)
    cv2.imwrite('images/0imagePrep1.jpg',imagePrep1)
    imagePrep2 = image_preprocess(image2rot)
    cv2.imwrite('images/0imagePrep2.jpg',imagePrep2)

    # print("VALIDACION:")
    string = pytesseract.image_to_string(imagePrep1, config=config)
    
    string2 = pytesseract.image_to_string(imagePrep2, config=config)
    # print("CEDULA NORMAL:")
    # print(string)
    # print("CEDULA INVERSA:")
    # print(string2)
   
    identificador=r'ECUADO'
    buscar=re.findall(identificador,string)
    buscar2=re.findall(identificador,string2)

    if len(buscar)!=0 or len(buscar2)!=0:
        check = True
        if len(buscar2)!=0:
            reverseIDCard=True
        
    return check, reverseIDCard

def recortar_imagen(image,reverse):
    if reverse:
        image = image[5:500, 150:1030]
        ancho=image.shape[1]
        alto=image.shape[0]
        M=cv2.getRotationMatrix2D((ancho//2,alto//2),180,1)
        image1=cv2.warpAffine(image,M,(ancho,alto))
        # image1 = imagerot[40:650, 250:885]
        cv2.imwrite('1imagereverse.jpg',image1)
    else :
        image1 = image[10:505, 150:1030]
        cv2.imwrite('1imagenormal.jpg',image1)
    return image1


def rotate_image(image):
    ancho=image.shape[1]
    alto=image.shape[0]
    M=cv2.getRotationMatrix2D((ancho//2,alto//2),180,1)
    imagerot=cv2.warpAffine(image,M,(ancho,alto))
    return imagerot


def class_IDCard(img):

    old_IDCard = False
    new_IDCard = False
    imageOIC = img[95:190, 290:610]
    imageOIC = image_preprocess(imageOIC)
    cv2.imwrite('images/1imageOIC.jpg',imageOIC)


    imageNIC = img[40:120, 475:730]
    imageNIC = image_preprocess(imageNIC)
    cv2.imwrite('images/1imageNIC.jpg',imageNIC)

    string = pytesseract.image_to_string(imageOIC, config=config)
    string2 = pytesseract.image_to_string(imageNIC, config=config)
    # print("CLASIFICACION:")
    # print("CEDULA ANTIGUA:")
    # print(string)
    # print("CEDULA NUEVA:")
    # print(string2)
    
    id=r'CIUDADAN'
    if len(re.findall(id,string))!=0:
        old_IDCard = True
        

    if len(re.findall(id,string2))!=0:
        new_IDCard = True
        

    return old_IDCard, new_IDCard


def data_oldIDCard(img):

    image_names = img[173:240, 287:685]
    img_aux  = image_names
    h, w, c = img_aux.shape
    img_aux=cv2.resize(img_aux,(w*2 , h*2), interpolation=cv2.INTER_CUBIC)
    gray = cv2.cvtColor(img_aux, cv2.COLOR_BGR2GRAY)

    image_names = image_preprocess2(image_names)
    cv2.imwrite('images/2nombresyapellidos_inicial.jpg',image_names)

    thresh = cv2.adaptiveThreshold(image_names, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY_INV, 11, 2)
    x0, y0, x1, y1 = letter_segment(thresh)
    imgRecorte = gray[y0-5:y1+10 , x0-10:x1+10]
    cv2.imwrite('images/2nombresyapellidos_final.jpg',imgRecorte)

    config = r'--psm 6'
    str_names = pytesseract.image_to_string(imgRecorte, config=config)
    str_names = re.sub(r'[^A-Z]',' ', str_names)

    image_number = img[85:180, 550:860]
    image_number = image_preprocess(image_number)
    # h, w, c = image_number.shape
    # image_number=cv2.resize(image_number,(w*2 , h*2), interpolation=cv2.INTER_CUBIC)
    # gray2 = cv2.cvtColor(image_number, cv2.COLOR_BGR2GRAY)

    # thresh2, imbw2= cv2.threshold(gray2, 31,250, cv2.THRESH_BINARY)
    # kernel = np.ones((1,1), np.uint8)
    # image2 = cv2.dilate(imbw2, kernel, iterations=1)
    # kernel = np.ones((1,1), np.uint8)
    # image2 = cv2.erode(image2, kernel, iterations=1)
    # image2 = cv2. morphologyEx(image2, cv2.MORPH_CLOSE, kernel)
    # image2 = cv2.medianBlur(image2, 3)
    # image2 = cv2.bitwise_not(image2)
    # kernel = np.ones((2,2), np.uint8)
    # image2 = cv2.dilate(image2, kernel, iterations=2)
    # image2 = cv2.bitwise_not(image2)

    cv2.imwrite("images/2numero_inicial.jpg", image_number)
    # encontrar contornos

    imgRecorte2= cv2.adaptiveThreshold(image_number,255,cv2.ADAPTIVE_THRESH_GAUSSIAN_C,cv2.THRESH_BINARY,75,15)
    # thresh2 = cv2.adaptiveThreshold(image_number, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY_INV, 13, 2)
    # cv2.imwrite('images/2numero_inter.jpg',thresh2)
    # x0, y0, x1, y1 = letter_segment2(thresh2)
    # imgRecorte2 = image_number[y0-5:y1+10 , x0-5:x1+10]
    cv2.imwrite('images/2numero_final.jpg',imgRecorte2)
    
    str_number = pytesseract.image_to_string(imgRecorte2, config=config)
    # print(str_number)
    # str_number = str_number.replace("S", "5")
    str_number = re.sub(r'\D','', str_number)
    print(str_number)
    

    return str_names, str_number


def data_newIDCard(img):

    image_lastname = img[75:145,270:580]
    image_lastname = image_preprocess(image=image_lastname)
    cv2.imwrite('images/3apellido_inicial.jpg',image_lastname)
    thresh0 = cv2.adaptiveThreshold(image_lastname, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY_INV, 11, 2)
    x0, y0, x1, y1 = letter_segment(thresh0)
    imgRecorte0 = image_lastname[y0-5:y1+10 , x0-10:x1+10]
    cv2.imwrite('images/3apellido_final.jpg',imgRecorte0)

    optionsdig = r'--psm 6'
    str_lastname = pytesseract.image_to_string(imgRecorte0, config=optionsdig)
    str_lastname = re.sub(r'[^A-Z]',' ', str_lastname)
    str_lastname = str_lastname.replace("   ", " ")

    image_name = img[150:195,270:610]
    image_name = image_preprocess(image= image_name)
    cv2.imwrite('images/3nombre_inicial.jpg',image_name)
    thresh = cv2.adaptiveThreshold(image_name, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY_INV, 11, 2)
    x0, y0, x1, y1 = letter_segment(thresh)
    imgRecorte = image_name[y0-5:y1+10, x0-10:x1+10]
    cv2.imwrite('images/3nombre_final.jpg', imgRecorte)

    optionsdig = r'--psm 6'
    str_name = pytesseract.image_to_string(imgRecorte, config=optionsdig)
    str_name = re.sub(r'[^A-Z]',' ', str_name)
    str_name = str_name.replace("   ", " ")
    
    number_image = img[400:520, 55:305]
    number_image = image_preprocess3(number_image)
    cv2.imwrite('images/3numero_inicial.jpg',number_image)
    config = r'--psm 6 --oem 1'
    str_number = pytesseract.image_to_string(number_image, config=config)
    print(str_number)
    str_number = str_number.replace("KU1","")
    str_number = str_number.replace("NU1","")
    str_number = str_number.replace("KUI","")
    str_number = str_number.replace("U1","")
    str_number = str_number.replace("O","0")
    # str_number = str_number.replace("1.","")
    str_parte = str_number.split(".")
    if len(str_parte) > 1:
        str_number = str_parte[1]
    str_number = re.sub(r'\D','', str_number)
    print(str_number)
    
    return str_name, str_lastname, str_number

def extract_photo(img):

    faces = faceClassif.detectMultiScale(img,
    scaleFactor=1.1,
    minNeighbors=5,
    minSize=(30,30),
    maxSize = (200,200))

    try:

        for (x,y,w,h) in faces:
            cv2.rectangle(img,(x-30,y-45),(x+w+30,y+h+55),(255,255,255),2)

        photo_IDCard = img[y-45:y+h+55, x-30:x+w+30]
        cv2.imwrite("photo_IDCard.jpg", photo_IDCard)

    except:
        return False

    return True


def post_data(names_data, number_data):
    url = 'http://142.93.245.213:3002/files'

    data = {
        'nombre' : names_data,
        'cedula' : number_data
    }

    image_file = 'photo_IDCard.jpg'
    unique_filename = str(uuid.uuid4())+'.jpg'

    with open(image_file, 'rb') as file:
        image_content = file.read()

    files = {'file' : (unique_filename, image_content)}
    
    try:
        response = requests.post(url,data=data, files=files)
        if response.status_code == 200:
            return True

        else:
            return False

    except:
        return False

    


def image_preprocess(image):

    h, w, c = image.shape
    image=cv2.resize(image,(w*2 , h*2), interpolation=cv2.INTER_CUBIC)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    imbw=cv2.adaptiveThreshold(gray,255,cv2.ADAPTIVE_THRESH_GAUSSIAN_C,cv2.THRESH_BINARY,75,15)
    kernel = np.ones((1,1), np.uint8)
    image = cv2.dilate(imbw, kernel, iterations=1)
    kernel = np.ones((1,1), np.uint8)
    image = cv2.erode(image, kernel, iterations=1)
    # image = cv2. morphologyEx(image, cv2.MORPH_CLOSE, kernel)
    image = cv2.medianBlur(image, 3)
    image = cv2.bitwise_not(image)
    kernel = np.ones((2,2), np.uint8)
    image = cv2.dilate(image, kernel, iterations=2)
    image = cv2.bitwise_not(image)

    return (image)


def image_preprocess2(image):

    h, w, c = image.shape
    image=cv2.resize(image,(w*2 , h*2), interpolation=cv2.INTER_CUBIC)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    imbw=cv2.adaptiveThreshold(gray,255,cv2.ADAPTIVE_THRESH_GAUSSIAN_C,cv2.THRESH_BINARY,105,12)
    kernel = np.ones((1,1), np.uint8)
    image = cv2.dilate(imbw, kernel, iterations=1)
    kernel = np.ones((1,1), np.uint8)
    image = cv2.erode(image, kernel, iterations=1)
    # image = cv2. morphologyEx(image, cv2.MORPH_CLOSE, kernel)
    image = cv2.medianBlur(image, 3)
    image = cv2.bitwise_not(image)
    kernel = np.ones((3,3), np.uint8)
    image = cv2.dilate(image, kernel, iterations=1)
    image = cv2.bitwise_not(image)

    return (image)

def image_preprocess3(image):

    h, w, c = image.shape
    image=cv2.resize(image,(w*2 , h*2), interpolation=cv2.INTER_CUBIC)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    imbw=cv2.adaptiveThreshold(gray,255,cv2.ADAPTIVE_THRESH_GAUSSIAN_C,cv2.THRESH_BINARY,105,12)
    kernel = np.ones((1,1), np.uint8)
    image = cv2.dilate(imbw, kernel, iterations=1)
    kernel = np.ones((1,1), np.uint8)
    image = cv2.erode(image, kernel, iterations=1)
    # image = cv2. morphologyEx(image, cv2.MORPH_CLOSE, kernel)
    image = cv2.medianBlur(image, 3)
    # image = cv2.bitwise_not(image)
    # kernel = np.ones((3,3), np.uint8)
    # image = cv2.dilate(image, kernel, iterations=1)
    # image = cv2.bitwise_not(image)

    return (image)

def min_pos(arr):
    valores_positivos = [num for num in arr if num > 10]
    if valores_positivos:
        minimo_positivo = min(valores_positivos)
        return minimo_positivo
    else:
        return None

def letter_segment(img):
    contours, hierarchy = cv2.findContours(img, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    my_arrayX = np.array([])
    my_arrayY = np.array([])

    for contour in contours:
        x, y, w, h = cv2.boundingRect(contour)
        if h > 25 and h < 40 :
            cv2.rectangle(img,(x,y),(x+w,y+h),(255,0,255),2)
            my_arrayX = np.append(my_arrayX, x)
            my_arrayX = np.append(my_arrayX, x+w)
            my_arrayY = np.append(my_arrayY, y)
            my_arrayY = np.append(my_arrayY, y+h)
    try:    
        x0 = int(min_pos(my_arrayX))
        y0 = int(min_pos(my_arrayY))

        x1 = int(max(my_arrayX))
        y1 = int(max(my_arrayY))

    except:
        x0 = 10
        y0 = 5
        x1 = 0
        y1 = 0

    return x0, y0, x1, y1

def letter_segment2(img):
    contours, hierarchy = cv2.findContours(img, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    my_arrayX = np.array([])
    my_arrayY = np.array([])

    for contour in contours:
        x, y, w, h = cv2.boundingRect(contour)
        if h > 20 and h < 35 :
            
            my_arrayX = np.append(my_arrayX, x)
            my_arrayX = np.append(my_arrayX, x+w)
            my_arrayY = np.append(my_arrayY, y)
            my_arrayY = np.append(my_arrayY, y+h)
    try:    
        x0 = int(min_pos(my_arrayX))
        y0 = int(min_pos(my_arrayY))

        x1 = int(max(my_arrayX))
        y1 = int(max(my_arrayY))

    except:
        x0 = 10
        y0 = 5
        x1 = 0
        y1 = 0

    return x0, y0, x1, y1


def error_alert():
    GPIO.output(ledRed,True)
    time.sleep(2)
    GPIO.output(ledRed,False)

def success_alert():
    GPIO.output(ledGreen,True)
    time.sleep(2)
    GPIO.output(ledGreen,False)

def success_step():
    GPIO.output(ledGreen,True)
    time.sleep(1)
    GPIO.output(ledGreen,False)

while True:
    x=GPIO.input(inPin)

    while x==False:
        inicio_proceso = time.time()
        success_step()
        
        time.sleep(2)
        image = captura()
        if not image:
            print("CAMARA NO CONECTADA")
            playsound('camaraerror.mp3')
            error_alert()
            break
        
        image = cv2.imread('image.jpg')
        dst = undistor(img=image)
        cv2.imwrite('imageUndistor.jpg', dst)
        check, reverseIDCard = checkID_function(dst)
        if not check:
            playsound('documentoincorrecto.mp3')
            error_alert()
            break
        success_step()

        #if reverseIDCard:
            # playsound('coloquecorrecto.mp3')
            # error_alert()
            # break
        imageID = recortar_imagen(image = dst,reverse = reverseIDCard)
        cv2.imwrite('image2.jpg',imageID)

        old_idCard, new_idCard = class_IDCard(img=imageID)  
        # print(old_idCard,new_idCard)  
        if old_idCard:
            names, number = data_oldIDCard(img=imageID)
            extr = extract_photo(imageID)
            if not extr:
                print("foto no detectada")
                playsound('lecturaerror.mp3')
                time.sleep(2)
                break
            if len(number) != 10:
                print("error numero")
                playsound('lecturaerror.mp3')
                time.sleep(2)
                break

            print("nombres y apellidos: ",names)
            print("numero: ", number)
            response = post_data(names_data=names, number_data=number)
            if not response:
                playsound('servidorerror404.mp3')
                error_alert()
                break
            
            playsound('registrorealizado.mp3')
            success_alert()
            fin_proceso = time.time()
            tiempo_transcurrido = fin_proceso - inicio_proceso
            print("El proceso tomó {:.2f} segundos.".format(tiempo_transcurrido))
            break


        if new_idCard:
            name, lastname, number = data_newIDCard(img=imageID)
            extr = extract_photo(imageID)
            if not extr:
                print("foto no detectada")
                playsound('lecturaerror.mp3')
                time.sleep(2)
                break
            if len(number) != 10:
                print("error numero")
                playsound('lecturaerror.mp3')
                time.sleep(2)
                break
            print("Nombres y Apellidos: ", lastname, name)
            print("Numero: ",number)
            response = post_data(names_data=lastname+' '+name, number_data=number)
            if not response:
               playsound('servidorerror404.mp3')
               error_alert()
               break
            
            playsound('registrorealizado.mp3')
            
            success_alert()
            fin_proceso = time.time()
            tiempo_transcurrido = fin_proceso - inicio_proceso
            print("El proceso tomó {:.2f} segundos.".format(tiempo_transcurrido))
            break
            
        print("Error de lectura")
        playsound('lecturaerror.mp3')
        time.sleep(2)
        break